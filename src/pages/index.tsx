import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from './home'
import { Cubes1Page } from './cubes1'
import { Cubes2Page } from './cubes2'
import { NudeModelPage } from './nude-model'

export function Pages() {
  return (
    <Switch>
      <Route path="/cubes1" component={Cubes1Page} />
      <Route path="/cubes2" component={Cubes2Page} />
      <Route path="/nude-model" component={NudeModelPage} />
      <Route component={HomePage} />
    </Switch>
  )
}
