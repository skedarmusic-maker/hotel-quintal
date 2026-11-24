/**
 * Utilitários para detecção e manipulação de mídias (fotos e vídeos) no Hotel Quintal dos Animais
 */

export const isVideoMedia = (url) => {
  if (!url || typeof url !== 'string') return false;
  const cleanUrl = url.split('?')[0].toLowerCase();
  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.m4v') ||
    cleanUrl.endsWith('.3gp') ||
    cleanUrl.endsWith('.ogv') ||
    cleanUrl.endsWith('.quicktime') ||
    url.includes('type=video')
  );
};

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};
