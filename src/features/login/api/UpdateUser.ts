import { IRequest } from '../../../common/helpers/axios';
import { UserEdit } from "../../../models/User";
import { RequestTypes } from '../../../common/models/enum';

const UpdateUser = (userEdit: UserEdit): IRequest => {
    return {
        url: '/api/v1/User',
        method: RequestTypes.Put,
        data: userEdit
    }
};
export default UpdateUser;
