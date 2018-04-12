import React from 'react';
import './styles.scss';

import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import Dropdown from '@trendmicro/react-dropdown';
import '~/components/DropdownButtons'; // Ensure CSS dependency

export default Dropdown;
export {
   DropdownToggle,
   DropdownMenu,
   DropdownMenuWrapper,
   MenuItem,
   DropdownButton
} from '@trendmicro/react-dropdown';

// const Dropdown = () => {
//    return (
//       <div>
//       </div>
//    )
// }
// export default Dropdown;