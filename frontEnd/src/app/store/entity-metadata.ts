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
};

// because the plural of "hero" is not "heros"
const pluralNames = {
    Client: 'clients',
    User: 'users',
    AppConfig: 'appConfigs',
};

export const entityConfig = {
    entityMetadata,
    pluralNames
};