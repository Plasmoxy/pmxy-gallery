import axios from 'axios'
import {apiGet} from './api'

export const auth = () => apiGet("auth")