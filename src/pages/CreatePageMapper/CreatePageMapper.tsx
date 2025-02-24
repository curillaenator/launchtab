import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams, Navigate } from 'react-router-dom';

import { $userStore } from '@src/entities/user';

import { CreateSpace } from '../CreateSpace';
import { CreateNote } from '../CreateNote';

import type { CreatePageT } from './interfaces';

const CREATE_COMPONENTS_ASSOC: Record<CreatePageT, FC> = {
  space: CreateSpace,
  note: CreateNote,
};

const CreatePageMapper: FC = () => {
  const { createPageType } = useParams<{ createPageType: CreatePageT }>();
  const { uid } = useEffectorUnit($userStore);

  if (!uid || !createPageType) return <Navigate to='/' replace />;

  const CreateMappedComponent = CREATE_COMPONENTS_ASSOC[createPageType];

  return <CreateMappedComponent />;
};

export { CreatePageMapper as CreatePageMapper };
