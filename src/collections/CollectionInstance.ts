import { autobind } from 'core-decorators';
import { WhereCondition } from '@defines/defines';
import { dbService } from '../firebaseService';
import { DocumentData } from '@defines/firebaseDefines';
import firebase from 'firebase';

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
    async add(vo: T): Promise<firebase.firestore.DocumentReference<DocumentData>> {
        return await dbService.collection(this._id).add(vo);
    }

    /**
     * 컬렉션의 데이터 조회
     * @param whereConditionList 데이터 조회를 위한 조건 배열
     */
    async get(whereConditionList: WhereCondition[] = []): Promise<firebase.firestore.QuerySnapshot<DocumentData>> {
        return whereConditionList
            .reduce((accumulator, { fieldPath, opStr, value }) => {
                return accumulator.where(fieldPath, opStr, value);
            }, dbService.collection(this._id))
            .get();
    }

    /**
     * 컬렉션에서 특정 데이터를 가진 문서 조회 후 수정
     * @param whereConditionList
     * @param vo
     */
    async update(whereConditionList: WhereCondition[] = [], vo: Partial<T>): Promise<void> {
        const { docs } = await this.get(whereConditionList);
        await Promise.all(
            docs.map((doc) => {
                dbService.doc(`${this._id}/${doc.id}`).update(vo);
            }),
        );
    }

    // TODO: 삭제 구현
}
