
export interface IAllSubjectRes {
    message: string
    metadata: Metadata
    subjects: Subject[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
}

export interface Subject {
    _id: string
    name: string
    icon: string
    createdAt: string
}


export interface IAllSubjectAdaptorRes {

    subjects: Subject[]
}