import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pick, isEqual } from 'lodash';

import { parseJSONWithoutError } from '@src/shared/parseJSONWithoutError';

import { getUserLaunchDataQuery } from '../api';
import { setUser } from '../store';
import { LaunchStoreUser } from '../interfaces';

import { USER_QUERY } from '@src/shared/queryKeys';
import { setSettings, type SettingsStore } from '../../settings';

const useLauncUserData = (user: LaunchStoreUser) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: userLaunchData = null, isLoading: isUserLaunchDataLoading } = useQuery({
    queryKey: [USER_QUERY, user.uid],
    queryFn: () => getUserLaunchDataQuery(user),
  });

  useEffect(() => {
    setIsLoading(true);
    const localSettings = parseJSONWithoutError<SettingsStore>(localStorage.getItem('settings'));

    if (!!localSettings) {
      // setSettings(JSON.parse(localSettings) as SettingsStore);
      setSettings(localSettings);
      setIsLoading(false);
    }

    if (!!userLaunchData) {
      setUser(pick(userLaunchData, ['lastViewedSpace', 'spaces', 'admin']));

      const isLocalSameAsIncoming = isEqual(userLaunchData.settings, localSettings);

      if (!isLocalSameAsIncoming && !!userLaunchData.settings) {
        setSettings(userLaunchData.settings as SettingsStore);
        localStorage.setItem('settings', JSON.stringify(userLaunchData.settings));
      }

      setIsLoading(false);
    }
  }, [userLaunchData]);

  return { isLoading: isUserLaunchDataLoading && isLoading };
};

export { useLauncUserData };
