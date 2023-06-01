import axios from 'axios';

interface ExportTaskStatus {
  status: string;
}

interface ExportTaskResponse {
  exportTaskId: string;
}

export interface ExportTaskStatusResponse {
  status: ExportTaskStatus;
}

class WebflowExporter {
  private readonly siteName: string;
  private readonly exportTimeout: number;

  constructor(siteName: string, exportTimeout: number = 60000) {
    console.log("Creating a new export service");
    this.siteName = siteName;
    this.exportTimeout = exportTimeout;
  }

  private async requestExportTaskId(): Promise<string> {
    const response = await axios.get<ExportTaskResponse>(
      `https://webflow.com/api/sites/${this.siteName}/queue-export`
    );
    return response.data.exportTaskId;
  }

  private async checkExportTaskStatus(taskId: string): Promise<ExportTaskStatusResponse> {
    let status: ExportTaskStatus;
    while (true) {
      const response = await axios.get<ExportTaskStatusResponse>(
        `https://webflow.com/api/site/${this.siteName}/tasks/${taskId}`
      );
      status = response.data.status;
      // console.log(`Task status: ${JSON.stringify(status)}`);
      if (status.status === 'finished') {
        console.log(response.data, 'responsedata');
        console.log(response, 'response ');
        return response.data;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  public async export(): Promise<ExportTaskStatusResponse> {
    try {
      const taskId = await this.requestExportTaskId();
      const status = await this.checkExportTaskStatus(taskId);
      return status;
    } catch (error) {
      console.error('Export task failed:', error);
      throw error;
    }
  }


  public async fetchJson(url: string): Promise<any> {

    const request = await axios({
      responseType: 'json',
      method: 'get',
      url: url,
    })

    return request;


  }



}

export default WebflowExporter;
