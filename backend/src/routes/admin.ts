import { Hono } from 'hono';
import { html } from 'hono/html';
import type { Env } from '../lib/types';
import { loginPage } from '../admin/login';
import { dashboardPage } from '../admin/dashboard';

export const adminApp = new Hono<{ Bindings: Env }>();

adminApp.get('/', (c) => c.redirect('/admin/'));
adminApp.get('/admin', (c) => c.redirect('/admin/'));
adminApp.get('/admin/', (c) => c.html(loginPage));
adminApp.get('/admin/dashboard', (c) => c.html(dashboardPage));
