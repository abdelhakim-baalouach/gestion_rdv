import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Client: {
        additionalCollectionState: {
            totalElements: 0,
        },
    },
    User: {
        additionalCollectionState: {
            totalElements: 0,
        },
    },
    AppConfig: {
        additionalCollectionState: {
            totalElements: 0,
        },
    },
    GestionRdv: {
        additionalCollectionState: {
            totalElements: 0,
        },
    }
};

const pluralNames = {
    Client: 'clients',
    User: 'users',
    AppConfig: 'appconfigs',
    GestionRdv: 'gestionrdvs',
};

export const entityConfig = {
    entityMetadata,
    pluralNames
};