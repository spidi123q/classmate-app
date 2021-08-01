import React, { useState, useEffect, useRef } from "react";
import { IResponse } from "../helpers/axios";
import {
  InitialPaginateResult,
  IPaginateResponse,
  IPaginateResult,
} from "../models/PaginateResult";
import _, { throttle, uniqBy } from "lodash";
import { DefaultonEndReachedThreshold, StartPage } from "../config/constants";
import cleanDeep from "clean-deep";
import Loader from "../components/Loader";
import IPagination from "../models/Pagination";
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import SkeletonList from "../components/SkeletonList";
import { Action, ActionFunction1 } from "redux-actions";
import { useDispatch } from "react-redux";
import { DefaultLoaderHeight } from "../config/themeConfig";
import { defaultDocKeyExtractor } from "../helpers/misc";

/**
 *
 * @param fetch API fetch function  whcih returns paginated responsde
 * @param Skeleton Skeleton loader
 */
export default function usePagination<T, U extends IPagination>(
  fetch: (params: U) => IPaginateResponse<T>,
  Skeleton?: () => JSX.Element,
  disableAutoInit?: boolean,
  setCollectionAction?: ActionFunction1<T[], Action<T[]>>,
  hideSkeleton?: boolean
) {
  const dispatch = useDispatch();
  /**
   * used to avoid data miss during state change. Note: should not be used for other purpose
   */
  const resultCollections = useRef<any[]>([]);
  /**
   * Params for data fetching
   */
  const query = useRef<IQuery<U>>();
  /**
   * list of items upto current page
   */
  const [collections, setCollections] = useState<T[]>([]);
  console.info("collections length: ", collections.length);

  const onEndReachedCalledDuringMomentum = useRef<boolean>(false);

  /**
   * Check if request is in progress
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Check if refresh control need to be enabled
   */
  const [showRefreshControl, setShowRefreshControl] = useState<boolean>(false);

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum.current = false;
  };

  const currentResult = useRef<IPaginateResult<any>>(InitialPaginateResult);

  /**
   *Fetch data from API
   */
  const fetchCollections = async () => {
    /**
     * check if end of pagination reached
     */
    if (!currentResult.current.hasNextPage) {
      return;
    }

    onEndReachedCalledDuringMomentum.current = true;

    let fetchQuery = { page: currentResult.current.nextPage, pagination: true };

    /** Adds query given by user */
    if (!_.isEmpty(query.current)) {
      fetchQuery = cleanDeep({
        ...query.current,
        page: currentResult.current.nextPage,
      }) as any;
    }
    setIsLoading(true);
    currentResult.current = (await fetch(fetchQuery as any)).payload;
    setIsLoading(false);

    /**
     * if page is start page then empty list and start as fresh
     */
    resultCollections.current =
      currentResult.current.page === StartPage
        ? currentResult.current.docs
        : [...resultCollections.current, ...currentResult.current.docs];

    resultCollections.current = uniqBy(resultCollections.current, "_id");

    setCollections(resultCollections.current);
  };

  /**
   * Reload list from strat
   */
  const reload = async () => {
    currentResult.current = InitialPaginateResult;
    onEndReachedCalledDuringMomentum.current = false;
    setCollections([]);
    await fetchCollections();
  };

  /**
   *
   * @param params Set params for fetching, will reload once set
   */
  const setQuery = (params?: IQuery<U> | undefined) => {
    query.current = params;
    reload();
  };

  /**
   * Load initial data
   */
  useEffect(() => {
    !disableAutoInit && reload();
  }, []);

  /**
   * Sync collection with state management
   */
  useEffect(() => {
    setCollectionAction && dispatch(setCollectionAction(collections));
  }, [collections]);

  /**
   * Footer component for Flat List
   */
  const RenderFooter = () => {
    if (isLoading) {
      if (
        Skeleton &&
        currentResult.current.page == StartPage &&
        !hideSkeleton
      ) {
        return <SkeletonList Component={Skeleton} />;
      }
      return <Loader type="loader" style={styles.loader} />;
    } else {
      return null;
    }
  };

  const RenderSummary = (props: ViewProps) => {
    return !isLoading && _.isEmpty(collections) ? (
      <View {...props}>
        <Loader type="empty" loop={false} />
      </View>
    ) : null;
  };

  const onRefresh = async () => {
    setShowRefreshControl(true);
    await reload();
    setShowRefreshControl(false);
  };

  return {
    collections,
    isLoading,
    reload,
    fetchCollections,
    setQuery,
    RenderFooter,
    RenderSummary,
    onMomentumScrollBegin,
    showRefreshControl,
    onRefresh,
  };
}

export type IQuery<U> = Omit<U, "page">;

const styles = StyleSheet.create({
  loader: {
    height: DefaultLoaderHeight,
    justifyContent: "center",
  },
});
