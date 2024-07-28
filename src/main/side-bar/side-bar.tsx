import { useEffect, useState } from 'react';
import './side-bar.css'

const SidebarComponent = () => {

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: string) => {
    event.preventDefault();
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <div className='sidebar-container'>
      <div className='upper-bar'>
        <button>Satılık</button>
        <button>Kiralık</button>
      </div>
    </div>
  );
};
export default SidebarComponent;