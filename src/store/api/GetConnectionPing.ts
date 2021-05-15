import { IRequest } from '../../common/helpers/axios';

const GetConnectionPing = ():IRequest => {
    return {
        url: '/api/v1/Connection/Ping'
    }
}
export default GetConnectionPing