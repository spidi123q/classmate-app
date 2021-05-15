import { Route, useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import NativeButton from "../../../../common/components/NativeButton";
import NativeField from "../../../../common/components/NativeField";
import NativeHeader from "../../../../common/components/NativeHeader";
import NativeImage from "../../../../common/components/NativeImage";
import NativeLayout from "../../../../common/components/NativeLayout";
import NativeView from "../../../../common/components/NativeView";
import TemplateList from "../../../../common/components/TemplateList";
import Typography from "../../../../common/components/Typography";
import {
  DefaultAvatarSize,
  DoubleMargin,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import { showToast } from "../../../../common/helpers/notification";
import { ToastTitle } from "../../../../common/models/enum";
import { IClaimEdit, InitialClaimEdit } from "../../../../models/Claim";
import IProduct from "../../../../models/Product";
import FieldsDTO from "../../dto/FieldsDTO";
import TemplateDTO from "../../dto/TemplateDTO";
import useClaimAPI from "../../../profile/hooks/useClaimAPI";
import { claimValidationScehma } from "./validationSchema";
import useKeyBoard from "../../../../common/helpers/useKeyboard";
import { slideUpProps } from "../../../../common/helpers/animation";

export default function ClaimForm() {
  const route = useRoute<Route<string, IParams | undefined>>();
  const { product } = route.params!;
  const templateDTO = new TemplateDTO(product.template);
  const fieldsDTO = new FieldsDTO(templateDTO.getAllFields());
  const fields = fieldsDTO.getFields("_id", "purchasedAt", "seller.name");
  const { isLoading, createClaim } = useClaimAPI();
  const navigation = useNavigation();
  const isKeyBoardActive = useKeyBoard();

  const handleSubmit = async (values: IClaimEdit) => {
    try {
      await createClaim({
        ...values,
        productId: product._id,
      });
      navigation.goBack();
      showToast(ToastTitle.Success, "Claim created created", "success");
    } catch (err) {
      showToast(ToastTitle.Error, err.message, "error");
    }
  };

  return (
    <NativeLayout backgroundColor={SecondaryBackgroundColor}>
      <NativeHeader title="Claim" />
      <NativeView type="scroll" margin={DoubleMargin}>
        <Formik
          initialValues={InitialClaimEdit}
          onSubmit={handleSubmit}
          validationSchema={claimValidationScehma}
        >
          {(formikProps) => (
            <NativeView justifyContent="center">
              {!isKeyBoardActive && (
                <NativeView type="animatable" {...slideUpProps}>
                  <NativeView
                    marginTop={DoubleMargin}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={DoubleMargin * 2}
                  >
                    <Typography family="semiBold">{product.name}</Typography>
                    <NativeImage
                      firebaseRef={product.brand.logo}
                      height={logoSize}
                      width={logoSize * 2}
                      resizeMode="center"
                    />
                  </NativeView>
                  <TemplateList
                    fields={fields}
                    value={product}
                    borderBottom
                    marginBottom={DoubleMargin}
                  />
                </NativeView>
              )}

              <NativeField
                formikProps={formikProps}
                name="title"
                type="text"
                placeholder="Reason for claim ?     "
                vericalSpacer
              />
              <NativeField
                formikProps={formikProps}
                name="address"
                type="location"
                placeholder="Your location     "
                vericalSpacer
              />
              <NativeField
                formikProps={formikProps}
                name="description"
                type="text"
                placeholder="Describe issue facing.      "
                size="lg"
                multiline
                numberOfLines={4}
                vericalSpacer
              />
              <NativeView marginTop={DoubleMargin}>
                <NativeButton
                  title="Request Now"
                  isLoading={isLoading}
                  onPress={() => formikProps.handleSubmit()}
                />
              </NativeView>
            </NativeView>
          )}
        </Formik>
      </NativeView>
    </NativeLayout>
  );
}

interface IParams {
  product: IProduct;
}

const logoSize = DefaultAvatarSize / 1.5;
