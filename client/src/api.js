import axios from 'axios';

const PATIENTS_URI = 'http://localhost:3000/patients';
const ACTIVE_PATIENTS_URI = `${PATIENTS_URI}?status=active`;

export const getPatients = (activeOnly) => {
  const uri = activeOnly ? ACTIVE_PATIENTS_URI : PATIENTS_URI;
  return async () => axios.get(uri);
}