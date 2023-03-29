import { MachineStatusModel } from '../models/DashboardModel';
import httpClient from '../utilities/http-client';

const getMachines = async () => {
  try {
    const response = await httpClient.get('machines');
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

const getMachineById = async (id: string) => {
  try {
    const response = await httpClient.get(`machines/${id}`);
    return response.data[0];
  } catch (error) {
    console.log('error', error);
  }
};

const getMachineStatuses = async () => {
  try {
    const response = await httpClient.get(`machines/statistics`);
    return response.data as MachineStatusModel;
  } catch (error) {
    console.log('error', error);
  }
};

const getTimelineData = async (parrams: any) => {
  try {
    const response = await httpClient.post(`machines/timeline`, parrams);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export {
  getMachines,
  getMachineById,
  getTimelineData,
  getMachineStatuses
};