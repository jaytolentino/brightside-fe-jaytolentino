import axios from 'axios';

const PATIENTS_URI = 'http://localhost:3000/patients';

export const getPatients = (activeOnly) => {
  const params = activeOnly ? { status: 'active' } : {};
  return async () => axios.get(PATIENTS_URI, { params: params });
}

export const getPatient = (id) => {
  return async () => axios.get(`${PATIENTS_URI}/${id}`);
};