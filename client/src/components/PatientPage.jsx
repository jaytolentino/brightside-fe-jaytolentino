import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Title1 } from './System';
import Table from './Table';
import { getPatient } from '../api';

const PatientDetailsTable = ({ patient: { fullName, email, phoneNumber }}) => (
  <Table className='bg-white'>
    <Table.Body>
      <Table.Row>
        <Table.DataItem><span className='font-bold'>Name</span></Table.DataItem>
        <Table.DataItem>{fullName}</Table.DataItem>
      </Table.Row>
      <Table.Row>
        <Table.DataItem><span className='font-bold'>Email</span></Table.DataItem>
        <Table.DataItem>{email}</Table.DataItem>
      </Table.Row>
      <Table.Row>
        <Table.DataItem><span className='font-bold'>Phone</span></Table.DataItem>
        <Table.DataItem>{phoneNumber}</Table.DataItem>
      </Table.Row>
    </Table.Body>
  </Table>
);

const PatientPage = () => {
  const { id } = useParams();
  const { data: response, isFetching } = useQuery(['patient'], getPatient(id));

  if (isFetching) {
    return;
  }

  const patient = response.data;
  return <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
    <Title1>{patient.fullName}</Title1>
    <PatientDetailsTable patient={patient} />
  </main >
}

export default PatientPage;