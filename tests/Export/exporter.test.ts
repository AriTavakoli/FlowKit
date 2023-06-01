import WebflowExporter from '../../src/Utils/WebflowExporter';
import { expect, jest, test, describe, it } from '@jest/globals';
import {ExportTaskStatusResponse} from '../../src/Utils/WebflowExporter';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WebflowExporter', () => {
  const siteName = 'testSite';
  const exportTimeout = 60000;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('constructor should set siteName and exportTimeout', () => {
    const exporter = new WebflowExporter(siteName, exportTimeout);
    expect(exporter).toHaveProperty('siteName', siteName);
    expect(exporter).toHaveProperty('exportTimeout', exportTimeout);
  });

  test('requestExportTaskId should make API call and return exportTaskId', async () => {
    const exportTaskId = 'testTaskId';
    mockedAxios.get.mockResolvedValueOnce({
      data: { exportTaskId },
    });

    const exporter = new WebflowExporter(siteName);
    const result = await exporter['requestExportTaskId']();

    expect(result).toBe(exportTaskId);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://webflow.com/api/sites/${siteName}/queue-export`
    );
  });

  test('checkExportTaskStatus should poll the API and return status when finished', async () => {
    const taskId = 'testTaskId';
    const expectedStatus: ExportTaskStatusResponse = { status: { status: 'finished' } };

    mockedAxios.get
      .mockResolvedValueOnce({ data: { status: { status: 'pending' } } })
      .mockResolvedValueOnce({ data: { status: { status: 'running' } } })
      .mockResolvedValueOnce({ data: expectedStatus });

    const exporter = new WebflowExporter(siteName);
    const result = await exporter['checkExportTaskStatus'](taskId);

    expect(result).toEqual(expectedStatus);
    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://webflow.com/api/site/${siteName}/tasks/${taskId}`
    );
  });

  test('export should call requestExportTaskId and checkExportTaskStatus and return status', async () => {
    const taskId = 'testTaskId';
    const expectedStatus: ExportTaskStatusResponse = { status: { status: 'finished' } };

    mockedAxios.get.mockResolvedValueOnce({ data: { exportTaskId: taskId } });
    mockedAxios.get.mockResolvedValueOnce({ data: expectedStatus });

    const exporter = new WebflowExporter(siteName);
    const result = await exporter.export();

    expect(result).toEqual(expectedStatus);
  });


});
