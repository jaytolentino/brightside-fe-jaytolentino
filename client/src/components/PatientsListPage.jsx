import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Switch from 'react-switch';

import Table from './Table';
import { Title1 } from './System';
import { getPatients } from '../api';

const LoadingTableBody = ({ rowCount = 5, colCount = 4 }) => <Table.Body className="animate-pulse">
  {Array.from({ length: rowCount }).map((_row, rowIdx) => {
    return <Table.Row key={`loading-row-${rowIdx}`}>
      {
        Array.from({ length: colCount }).map((_col, colIdx) => {
          return <Table.DataItem key={`loading-row-${rowIdx}-col-${colIdx}`}><div className="h-2 bg-gray-400 rounded col-span-2" /></Table.DataItem>
        })
      }
    </Table.Row>
  })}
</Table.Body>

const PatientTableBody = ({ patients }) => {
  return <Table.Body>
    {
      patients.map((patient) => {
        return <Table.Row key={`patient-row-${patient.id}`}>
          <Table.DataItem>{patient.id}</Table.DataItem>
          <Table.DataItem>{patient.firstName}</Table.DataItem>
          <Table.DataItem>{patient.email}</Table.DataItem>
          <Table.DataItem>{patient.status}</Table.DataItem>
        </Table.Row>
      })
    }
  </Table.Body >
}

const PatientsTable = ({ patients, isLoading }) => {
  return <Table className='bg-white'>
    <Table.Head>
      <Table.HeadItem>Id</Table.HeadItem>
      <Table.HeadItem>Name</Table.HeadItem>
      <Table.HeadItem>Email</Table.HeadItem>
      <Table.HeadItem>Status</Table.HeadItem>
    </Table.Head>
    {
      isLoading ? <LoadingTableBody rowCount={5} colCount={4} /> : <PatientTableBody patients={patients} />
    }
  </Table>
}

const ActivePatientsFilter = ({ checked, onToggle }) => {
  const switchConfig = {
    checkedIcon: false,
    uncheckedIcon: false,
    width: 40,
    height: 20,
    handleDiameter: 17,
    onColor: '#343D55',
    offColor: '#C2C5CC',
  };

  return (
    <div className='align-middle filter-container my-4'>
      <span>INACTIVE</span>
      <Switch
        className='filter-switch'
        onChange={onToggle}
        checked={checked}
        {...switchConfig}
      />
      <span>ACTIVE</span>
    </div>
  );
};

const PatientsListPage = () => {
  const [activeOnly, setActiveOnly] = useState(false);
  const { data: response, isFetching } = useQuery(['patients'], getPatients(activeOnly));
  const queryClient = useQueryClient();

  const onToggle = () =>  {
    if (isFetching) {
      return;
    }
    queryClient.clear();
    queryClient.refetchQueries(['patients'], getPatients(!activeOnly));
    setActiveOnly(!activeOnly);
  };

  return <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
    <div className='all-patients-header'>
      <Title1>All Patients</Title1>
      <ActivePatientsFilter checked={activeOnly} onToggle={onToggle} />
    </div>
    <PatientsTable isLoading={isFetching} patients={response?.data} />
  </main >
}

export default PatientsListPage;