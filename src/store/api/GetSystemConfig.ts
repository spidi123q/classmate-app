import { IRequest } from '../../common/helpers/axios';

const GetSystemConfig = ():IRequest => {
    return {
        url: '/api/v1/Config/SystemConfig'
    }
}
export default GetSystemConfig