import Dish from './Dish';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dish}/>
        </Switch>
    </main>
)


export default Routes;