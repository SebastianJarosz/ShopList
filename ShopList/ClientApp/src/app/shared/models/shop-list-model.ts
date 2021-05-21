import { IPostData } from "../interface/IPostData";

export class ShopListModel implements IPostData{
    id?: number;
    listName?: string;
    listPostion?: Array<ListPostionModel>;
    creationDate?: Date;
    lastModficationDate?: Date;
    shopPrice?: number;
    status?: string;
}

export class ListPostionModel{
    postionName?: string;
    quantity?: number;
    unit?: string;
}