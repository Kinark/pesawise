import React, { Component } from 'react'
import { Dropdown, Menu, Container, Image, Responsive, Icon } from 'semantic-ui-react'
import { LogoFullGradient, LogoGradient } from '~/components/Logo'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'
import { slide as SideNav } from 'react-burger-menu'
import SimpleCollapsible from '~/components/SimpleCollapsible'

// import { Safaricon, Equity, Other } from '~/components/Calculators'
import Urlfy from '~/components/Urlfy'
import './styles.scss';

export default class Navbar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         calculators: [],
         routes: {},
         loading: true,
         sidebar: false
      }
      this.activateSidenav = this.activateSidenav.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
   }

   componentDidMount() {
      // const favCalculators = []
      const that = this
      Axios.all([
         Axios.get(ajaxUrl + '/calculators.json').catch(),
         Axios.get(ajaxUrl + '/nav-routes.json').catch()
      ]).then(Axios.spread((res1, res2) => {
         let newRoutes = {};
         that.setState({ calculators: res1.data, routes: res2.data }, () => {
            Object.entries(that.state.routes).map(([key, value]) => {
               value.map(i => {
                  let currentCalculator = that.state.calculators.find(calculator => (calculator.id == i))
                  // console.log(currentCalculator)
                  // console.log(key)
                  if (typeof newRoutes[key] == 'undefined') newRoutes[key] = {}
                  newRoutes[key][currentCalculator.calculator] = Urlfy('/calculator/' + currentCalculator.calculator)
               })
            })
            that.setState({ routes: newRoutes, loading: false })
         })
      }))
   }

   handleStateChange(state) {
      this.setState({ sidebar: state.isOpen })
      if (state.isOpen) {
         document.body.style.overflowY = "hidden"
      } else {
         document.body.style.overflowY = "scroll"
      }
   }

   closeMenu() {
      this.setState({ sidebar: false })
   }

   activateSidenav() {
      this.setState({ sidebar: !this.state.sidebar })
   }

   render() {
      const { activeItem, routes, loading, sidebar } = this.state

      return (
         <div>
            <SideNav isOpen={sidebar} onStateChange={(state) => this.handleStateChange(state)} customBurgerIcon={false} customCrossIcon={false}>
               <div>
                  <div className="bg-header-side">
                     <Image onClick={this.closeMenu} as={Link} to='/' src={LogoFullGradient} size='large' style={{ display: 'inherit', width: '85%', margin: '0 auto' }} />
                  </div>
                  {!loading &&
                     Object.entries(routes).map(([key, value], index) => (
                        <SimpleCollapsible className="side" key={index} title={key} closed>
                           {Object.entries(value).map(([key, value], index) => (
                              <Link onClick={this.closeMenu} key={index} to={value}>{key}</Link>
                           ))}
                        </SimpleCollapsible>
                     ))
                  }
               </div>
            </SideNav>
            <Menu position='right' className="uhu" borderless>
               <Container>
                  <Responsive maxWidth="600" as={Menu.Menu} position='left'>
                     <Menu.Item onClick={this.activateSidenav}>
                        <Icon size="large" name="sidebar" />
                     </Menu.Item>
                  </Responsive>
                  <Responsive minWidth="601" as={LogoFull} />
                  <Responsive maxWidth="600" as={LogoFullSmall} />
                  <Responsive maxWidth="600" as={Menu.Menu} style={{ opacity: '0', pointerEvents: 'none' }} position='right'>
                     <Menu.Item onClick={this.activateSidenav}>
                        <Icon size="large" name="sidebar" />
                     </Menu.Item>
                  </Responsive>
                  <Responsive minWidth="601" as={Menu.Menu} position='right'>
                     {!loading &&
                        Object.entries(routes).map(([key, value], index) => (
                           <Dropdown basic open={false} key={index} text={key} simple icon={null} className='link item'>
                              <Dropdown.Menu>
                                 {Object.entries(value).map(([key, value], index) => (
                                    <Dropdown.Item as={Link} key={index} to={value}>{key}</Dropdown.Item>
                                 ))}
                              </Dropdown.Menu>
                           </Dropdown>
                        ))
                     }
                  </Responsive>
               </Container>
            </Menu >
         </div>
      )
   }
}

const LogoFull = () => (
   <Image as={Link} to='/' src={LogoFullGradient} size='small' style={{ display: 'inherit' }} />
)

// const Logo = () => (
//    <Image as={Link} to='/' src={LogoGradient} size='mini' style={{ display: 'inherit' }} />
// )

const LogoFullSmall = () => (
   <Image as={Link} to='/' src={LogoFullGradient} size='small' style={{ margin: 'auto' }} />
)