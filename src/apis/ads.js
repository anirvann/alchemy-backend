// import { DataSource } from 'apollo-datasource';
import axios from 'axios';

const URL = 'http://localhost:5001/';
const xhr = axios.create({
  baseURL: URL
});

export class AdsService {
  getAds(adsColln){ return xhr.get(`/ads${!!adsColln? '/' + adsColln : ''}`) }
}