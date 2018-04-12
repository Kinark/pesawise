import React from 'react'
import './styles.scss'
import { Route, Link } from 'react-router-dom'
import propTypes from 'prop-types'
import DummyLogo from './images/dummylogo.svg'

const defaultNavbarSettings = {
   scrollDistance: '64',
   logo: [DummyLogo],
   activeLogo: true,
   logoPosition: 'left',
   itemsPosition: 'right',
   background: 'rgba(255, 255, 255, 0.02)',
   scrolledBackground: 'rgba(255, 255, 255, 0.02)',
   container: true,
}

class NavbarConstructor extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         scrolled: false,
      };
   }

   componentDidMount() {
      const { scrollDistance, changeOnScroll } = this.props;
      const settings = Object.assign({}, defaultNavbarSettings, this.props.settings);
      if (settings.logoPosition == settings.itemsPosition) {
      }
      if (changeOnScroll) {
         window.addEventListener('scroll', function () {
            if (window.pageYOffset > scrollDistance) {
               this.updateState({ scrolled: true })
            } else {
               this.updateState({ scrolled: false })
            }
         })
      }
   }
   render() {
      const { fixed, className, style, changeOnScroll, background, scrolledBackground } = this.props;
      const settings = Object.assign({}, defaultNavbarSettings, this.props.settings);
      const scrolled = this.state;

      // Classes variables
      const isFixed = fixed ? ' fixed ' : '';
      const isScrolled = scrolled ? ' scrolled ' : '';
      const extraClasses = " navbar ";

      // Style Variables
      const colors = scrolled ? { backgroundColor: settings.scrolledBackground } : { backgroundColor: settings.background };

      // Classes and styles constructor
      const classes = className + isFixed + isScrolled + extraClasses;
      const styles = Object.assign({}, style, colors);

      // Position constructor
      let ulClass, containerClass, logoClass = '';
      if (settings.logoPosition == 'left' && settings.itemsPosition == 'left') {
         containerClass = 'flex-start'
      } else if (settings.logoPosition == 'left' && settings.itemsPosition == 'center') {
         containerClass = 'flex-space-between after'
      } else if (settings.logoPosition == 'left' && settings.itemsPosition == 'right') {
         containerClass = 'flex-space-between'
      } else if (settings.logoPosition == 'center' && settings.itemsPosition == 'left') {
         containerClass = 'flex-space-between after grow'
         ulClass = 'order'
         logoClass = 'grow'
      } else if (settings.logoPosition == 'center' && settings.itemsPosition == 'center') {
         containerClass = 'flex-center'
      } else if (settings.logoPosition == 'center' && settings.itemsPosition == 'right') {
         containerClass = 'flex-space-between before grow'
         logoClass = 'grow'
      } else if (settings.logoPosition == 'right' && settings.itemsPosition == 'left') {
         containerClass = 'flex-space-between'
         ulClass = 'order'
      } else if (settings.logoPosition == 'right' && settings.itemsPosition == 'center') {
         containerClass = 'flex-space-between before'
         ulClass = 'order'
      } else if (settings.logoPosition == 'right' && settings.itemsPosition == 'right') {
         containerClass = 'flex-end'
      }

      // Logo constructor
      let Logo;
      if (settings.activeLogo) {
         Logo = (<div className={logoClass + " logo "}><Link to="/"><img src={settings.logo} /></Link></div>)
      } else {
         Logo = (<div></div>)
      }

      return (
         <nav className={classes} style={styles}>
            <div className={containerClass + " container "}>
               {Logo}
               <ul className={ulClass}>
                  {this.props.children}
               </ul>
            </div>
         </nav >
      );
   }
}

NavbarConstructor.propTypes = {
   settings: propTypes.shape({
      scrollDistance: propTypes.string,
      // logo: propTypes.string,
      activeLogo: propTypes.bool,
      logoPosition: propTypes.oneOf(['left', 'center', 'right']),
      itemsPosition: propTypes.oneOf(['left', 'center', 'right']),
      background: propTypes.string,
      scrolledBackground: propTypes.string,
      container: propTypes.bool,
   }),
   fixed: propTypes.bool,
   className: propTypes.string,
   changeOnScroll: propTypes.bool,
};

NavbarConstructor.defaultProps = {
   fixed: false,
   className: '',
   changeOnScroll: false,
   settings: defaultNavbarSettings,
};

class NavItem extends React.Component {
   render() {
      var isActive = this.context.router.route.location.pathname === this.props.to;
      var className = isActive ? 'active' : '';

      return (
         <li className={className}>
            <Link exact="true" {...this.props}>
               {this.props.children}
            </Link>
         </li>
      );
   }
}

NavItem.contextTypes = {
   router: propTypes.object
};

export { NavbarConstructor, NavItem };