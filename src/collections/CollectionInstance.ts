import { autobind } from 'core-decorators';
import { OrderByParams, WhereCondition } from '@defines/defines';
import { dbService } from '../firebaseService';
import { DocumentData } from '@defines/firebaseDefines';
import firebase from 'firebase';

@autobind
export default class CollectionInstance<T> {
    private readonly _id: string;

    constructor(id: string) {
        this._id = id;
    }

    /**
     * 컬렉션에 데이터 추가
     * @param vo
     */
    async add(vo: T): Promise<firebase.firestore.DocumentReference<DocumentData>> {
        return dbService.collection(this._id).add(vo);
    }

    /**
     * 컬렉션의 데이터 조회
     * @param whereConditionList 데이터 조회를 위한 조건 배열
     */
    async get(whereConditionList: WhereCondition[] = []): Promise<firebase.firestore.QuerySnapshot<DocumentData>> {
        return (await this.getQueryReference(whereConditionList)).get();
    }

    /**
     * 컬렉션 데이터 정렬 조건으로 조회
     * @param orderByParam
     * @param whereConditionList
     */
    async getOrderBy(orderByParam: OrderByParams, whereConditionList: WhereCondition[] = []) {
        const { fieldPath, directionStr = 'asc' } = orderByParam;
        return (await this.getQueryReference(whereConditionList)).orderBy(fieldPath, directionStr).get();
    }

    /**
     * 컬렉션에서 특정 데이터를 가진 문서 조회 후 수정
     * @param whereConditionList
     * @param vo
     */
    async updateByWhereConditions(vo: Partial<T>, whereConditionList: WhereCondition[] = []): Promise<void> {
        const { docs } = await this.get(whereConditionList);
        await this.updateByDocs(vo, docs);
    }

    /**
     * 컬렉션에서 특정 문서 데이터 수정
     * @param vo
     * @param docs
     */
    async updateByDocs(vo: Partial<T>, docs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] = []) {
        await Promise.all(
            docs.map((doc) => {
                dbService.doc(`${this._id}/${doc.id}`).update(vo);
            }),
        );
    }

    // TODO: 삭제 구현

    /**
     * where 조건으로 필터링한 DocumentData 의 레퍼런스 반환
     * @param whereConditionList
     * @private
     */
    private async getQueryReference(
        whereConditionList: WhereCondition[] = [],
    ): Promise<firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | firebase.firestore.Query<firebase.firestore.DocumentData>> {
        return whereConditionList.reduce((accumulator, { fieldPath, opStr, value }) => {
            return accumulator.where(fieldPath, opStr, value);
        }, dbService.collection(this._id));
    }
}
