import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/noMatch'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import notice from './pages/ui/notice'
import messages from './pages/ui/message'
import tabs from './pages/ui/tabs'
import gallery from './pages/ui/gallery'
import carousel from './pages/ui/carousel'
import login from './pages/form/login'
import register from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import highTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import User from './pages/user'
import Common from './common'
import OrderDetail from './pages/order/detail'

export default class IRouter extends React.Component{
   
    render(){
   
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} replace />
                                <Route path="/admin/ui/modals" component={Modals} replace />
                                <Route path="/admin/ui/loading" component={Loadings} replace />
                                <Route path="/admin/ui/notification" component={notice} replace />
                                <Route path="/admin/ui/messages" component={messages} replace />
                                <Route path="/admin/ui/tabs" component={tabs} replace />
                                <Route path="/admin/ui/gallery" component={gallery} replace />
                                <Route path="/admin/ui/carousel" component={carousel} replace />
                                <Route path="/admin/form/login" component={login} replace />
                                <Route path="/admin/form/reg" component={register} replace />
                                <Route path="/admin/table/basic" component={BasicTable} replace />
                                <Route path="/admin/table/high" component={highTable} replace />
                                <Route path="/admin/city" component={City} replace />
                                <Route path="/admin/order" component={Order} replace />
                                <Route path="/admin/user" component={User} replace />
                                <Route component={NoMatch} />
                            </Switch>
                        
                        </Admin>
                    }/>
                 
                    <Route path='/common' render={() => 
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                        </Common>
                    }/>
                </App>
            </HashRouter>
        )
    }
}