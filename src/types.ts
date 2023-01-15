/**
 *
 * To create/update typings from OpenAPI:
 *
 * ```bash
 * npx openapi-typescript@2 https://api.appcenter.ms/preview/swagger.json --output appcenter.ts
 * ```
 */

export interface Deployment {
  key?: string;
  name: string;
  latest_release?: {
    target_binary_range?: string;
    description?: string;
    is_disabled?: boolean;
    is_mandatory?: boolean;
    rollout?: number;
    label?: string;
    package_hash?: string;
    blob_url?: string;
    diff_package_map?: {
      [key: string]: object;
    };
    /** Set on 'Promote' */
    original_deployment?: string;
    /** Set on 'Promote' and 'Rollback' */
    original_label?: string;
    released_by?: string;
    /** The release method is unknown if unspecified */
    release_method?: 'Upload' | 'Promote' | 'Rollback';
    size?: number;
    upload_time?: number;
  };
}
