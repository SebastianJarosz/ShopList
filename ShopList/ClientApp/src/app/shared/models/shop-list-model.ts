import { IPostData } from "../interface/IPostData";

export class ShopListModel implements IPostData{
    id?: number;
    listName?: string;
    listPostion?: string | any;
    creationDate?: string;
    lastModficationDate?: string;
    shopPrice?: number;
    status?: number;

    constructor(){}
}

export class ListPostionModel{
    posName?: string;
    quantity?: number;
    unit?: string;
}