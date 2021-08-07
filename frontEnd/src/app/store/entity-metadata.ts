import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Client: {
        additionalCollectionState: {
            totalElements: 0,
        },
    },
};

// because the plural of "hero" is not "heros"
const pluralNames = {
    Client: 'clients',
};

export const entityConfig = {
    entityMetadata,
    pluralNames
};