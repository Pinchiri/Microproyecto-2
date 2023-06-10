import React from 'react'
import { Outlet } from 'react-router'
import { NavBar } from '../../components/NavBar/NavBar';
import { Footer } from '../../components/Footer/Footer';
import styles from './Layout.module.css';

//import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    // <UserContextProvider>
      <main>
        <NavBar />
        <section className={styles.body}>
          <Outlet />
        </section>
        <Footer />
      </main>
    // </UserContextProvider>
  );
}
