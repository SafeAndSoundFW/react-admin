import JsonP from 'jsonp'
import axios from 'axios';
import { Modal } from 'antd';
import Utils from '../utils/utils';
// 导出一个对象给其他页面使用
export default class Axios {
    static requestList(_this,url,params,isMock) {
        var data = {
            params:params
        }
        this.ajax({
            url:url,
            data
        }).then((data) => {
            if (data && data.result) {
                let list = data.result.item_list.map((item,index) => {
                    item.key = index;
                    return item
                })
                _this.setState({
                    list,
                    pagination:Utils.pagination(data,(current) => {
                        _this.params.page = current;
                        _this.requestList();

                    })
                })
            }

        })
    }
    static jsonp (options) {
      return  new Promise ((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response) {
                // 失败的，和响应的
                if (response.status == 'success') {
                    resolve(response);
                }else {
                    reject(response.message)
                }

            })
        })

    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
        return new Promise((resolve,reject) => {
            axios({
                url:baseApi+options.url,
                method:'get',
                baseUrl: baseApi,
                timeout:5000,
                params:(options.data &&options.data.params) || ''
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                    let res = response.data;
                   
                    if (res.code == '0') {
                        resolve(res)
                    }

                }else {
                    Modal.info({
                        title:'提示',
                        content:'res.msg'
                    })
                    reject(response.data);
                }

            })
        })
    }

}
