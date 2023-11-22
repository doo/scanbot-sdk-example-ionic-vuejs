import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ImagePreviewPage from '@/views/ImagePreviewPage.vue';
import DocumentScannerPage from '../views/features/document_detector/DocumentScannerPage.vue';
import BarcodeScannerPage from '../views/features/barcode_detector/BarcodeScannerPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/image_preview',
    name: 'ImagePreview',
    component: ImagePreviewPage,
  },
  {
    path: '/document_scanner/:selectedItem',
    name: 'DocumentScanner',
    component: DocumentScannerPage,
  },
  {
    path: '/barcode_scanner/:selectedItem',
    name: 'BarcodeScannerPage',
    component: BarcodeScannerPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
