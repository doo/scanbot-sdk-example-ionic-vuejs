import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ImagePreviewPage from '@/views/features/document_detector/ImagePreviewPage.vue';
import DocumentScannerPage from '../views/features/document_detector/DocumentScannerPage.vue';
import BarcodeScannerPage from '../views/features/barcode_detector/BarcodeScannerPage.vue';
import ImageEditPage from '@/views/features/document_detector/ImageEditPage.vue';
import BarcodeResultPage from '../views/features/barcode_detector/BarcodeResultPage.vue';
import DataDetectorPage from '../views/features/data_detectors/DataDetectorPage.vue';
import MRZResultPage from '../views/features/data_detectors/MRZResultPage.vue';
import EHICResultPage from '../views/features/data_detectors/EHICResultPage.vue';
import CheckResultPage from '../views/features/data_detectors/CheckResultPage.vue';

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
    path: '/image_edit/:selectedPageId',
    name: 'ImageEditPage',
    component: ImageEditPage,
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
  {
    path: '/barcode_result',
    name: 'BarcodeResultPage',
    component: BarcodeResultPage,
  },
  {
    path: '/data_detector/:selectedItem',
    name: 'DataDetectorPage',
    component: DataDetectorPage,
  },
  {
    path: '/mrz_result',
    name: 'MRZResultPage',
    component: MRZResultPage,
  },
  {
    path: '/ehic_result',
    name: 'EHICResultPage',
    component: EHICResultPage,
  },
  {
    path: '/check_result',
    name: 'CheckResultPage',
    component: CheckResultPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
