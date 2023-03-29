export interface StatusDetailModel {
  _id: string;
  value: number; 
};

export interface MachineStatusModel {
  StatusDetails: StatusDetailModel;
  Total: number;
}