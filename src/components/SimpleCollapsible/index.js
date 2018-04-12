import React from 'react';
import './styles.scss';

export default class SimpleCollapsible extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: this.props.closed ? false : true,
      };
      this.toggleShow = this.toggleShow.bind(this)
   }

   toggleShow() {
      if (this.state.show)
         this.setState({ show: false })
      else
         this.setState({ show: true })
   }

   render() {
      const bodyClass = this.state.show ? 'cola-body' : 'cola-body hidden'
      const titleClass = this.state.show ? 'cola-title active' : 'cola-title'
      return (
         <div className="simple-collapsible">
            <p className={titleClass} onClick={this.toggleShow}>{this.props.title}</p>
            <div className={bodyClass}>
               <div>
                  {this.props.children}
               </div>
            </div>
         </div>
      );
   }
}

