import Link from "next/link"

import {useStater} from '@/hooks/useStater'

import styles from '@/app/css/header.module.css'

export const NavigationBar = ({place = 'header', burgerSetter = false}) => {

  const menu = useStater('menu')

  const closedBurger = () => {
    burgerSetter(false);
  }

  return(
    <nav className = {`${styles.nav}`}>
      {
        (menu) ?
          menu.map((item, index) => {
            return(
              <Link onClick = {(typeof(burgerSetter) === 'function') ? closedBurger : null} href={item.href} key={`navmenu_${index}`}>{item.name}</Link>
            )
          })
              : null
      }
    </nav>
  )
}
