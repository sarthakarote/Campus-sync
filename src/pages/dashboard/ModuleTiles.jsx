/* Dashboard module tiles: one large tile per module, each with a real image
   background and an icon. Clicking a tile opens that module. */

import Icon from '../../components/Icon.jsx'

const MODULES = [
  {
    id: 'complaints',
    label: 'Complaints',
    text: 'Raise and track campus issues',
    icon: 'flag',
    image: '/images/hero-classroom.jpg',
  },
  {
    id: 'mart',
    label: 'Campus Mart',
    text: 'Buy and sell student items',
    icon: 'tag',
    image: '/images/product-stationery.jpg',
  },
  {
    id: 'lostfound',
    label: 'Lost and Found',
    text: 'Report or claim lost items',
    icon: 'magnifier',
    image: '/images/lf-backpack.jpg',
  },
  {
    id: 'queues',
    label: 'Campus Queues',
    text: 'Live canteen and pass queues',
    icon: 'clock',
    image: '/images/hero-canteen.jpg',
  },
]

export default function ModuleTiles({ onNavigate }) {
  return (
    <div className="module-tiles">
      {MODULES.map((module) => (
        <button
          type="button"
          className="module-tile"
          key={module.id}
          onClick={() => onNavigate(module.id)}
        >
          <img className="module-tile__image" src={module.image} alt="" />
          <span className="module-tile__overlay" />
          <span className="module-tile__icon">
            <Icon name={module.icon} size={22} />
          </span>
          <span className="module-tile__body">
            <span className="module-tile__title">{module.label}</span>
            <span className="module-tile__text">{module.text}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
