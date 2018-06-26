import React, { Component } from 'react'

import { Switch, Route, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { getWeather, getNews } from './redux'

import withLoading from './shared/withLoading'
import MainWrapper from './components/MainWrapper';
import Navbar from './components/Navbar/Navbar'
import Weather from './components/Weather/Weather'
import NewsContainer from './components/News/NewsContainer'
import Game from './components/GameV2/Game'

import './App.css'

const MainWrapperWithLoading = withLoading(MainWrapper)

class App extends Component {
  componentDidMount() {
    this.props.getWeather()
    this.props.getNews()
  }

  render() {
    return (
      <div 
        className="main-wrapper" 
        style={
          this.props.isLoading ? 
            {justifyContent: 'center'} : null
        }
      >
        <MainWrapperWithLoading isLoading={this.props.isLoading} className="app-wrapper">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Weather}/>
            <Route path="/News" component={NewsContainer}/>
            <Route path="/Game" component={Game}/>
          </Switch>
        </MainWrapperWithLoading>
      </div>
    )
  }
}

// https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
// react-redux blocks the updates that would normally happen with react-router-dom
// withRouter fixes that
// This is inneficient however so I should change this
export default withRouter(connect(state => ({ isLoading: state.isLoading }), { getWeather, getNews })(App))
