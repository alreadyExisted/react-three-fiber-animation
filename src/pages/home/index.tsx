import React from 'react'
import styles from './styles.module.css'
import { NavLink } from 'react-router-dom'

export function HomePage() {
  return (
    <div className={styles.page}>
      <h1>Animations</h1>
      <ol>
        <li>
          <NavLink to="/cubes1">Cubes1</NavLink>
        </li>
        <li>
          <NavLink to="/cubes2">Cubes2</NavLink>
        </li>
        <li>
          <NavLink to="/nude-model">Nude Model (+18)</NavLink>
        </li>
      </ol>
    </div>
  )
}
