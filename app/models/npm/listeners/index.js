/* eslint-disable import/prefer-default-export */

import onNpmAudit$ from './npmAudit';
import onNpmDoctor$ from './npmDoctor';
import onNpmDedupe$ from './npmDedupe';
import onNpmInit$ from './npmInit';
import onNpmCache$ from './npmCache';

export { onNpmAudit$, onNpmDoctor$, onNpmInit$, onNpmDedupe$, onNpmCache$ };
