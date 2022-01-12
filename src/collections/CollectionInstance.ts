import { autobind } from 'core-decorators';
import { WhereCondition } from '@defines/defines';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;
import { dbService } from '@/firebaseService';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@autobind
export default class CollectionInstance<T> {
    private _id: string;

    constructor(id: string) {
        this._id = id;
    }

    /**
     * 컬렉션에 데이터 추가
     * @param vo
     */
    async add(vo: T): Promise<DocumentReference<DocumentData>> {
        return await dbService.collection(this._id).add(vo);
    }

    /**
     * 컬렉션의 데이터 조회
     * @param whereConditionList 데이터 조회를 위한 조건 배열
     */
    async get(whereConditionList: WhereCondition[] = []): Promise<QuerySnapshot<DocumentData>> {
        return whereConditionList
            .reduce((accumulator, { fieldPath, opStr, value }) => {
                return accumulator.where(fieldPath, opStr, value);
            }, dbService.collection(this._id))
            .get();
    }
}
