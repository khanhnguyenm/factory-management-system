export interface IBuildingItem {
    id: string;
    label: string;
    isActive?: boolean
}
export interface IManufactoryItemProps {
    buildingList: IBuildingItem[];
}


export interface IBuildingItemProps {
    building: IBuildingItem;
}