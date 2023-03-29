import * as React from 'react';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './Routes';

import './style.scss';

export default function App() {
  const router = useRoutes(routes);
  return <Suspense>{router}</Suspense>;
}