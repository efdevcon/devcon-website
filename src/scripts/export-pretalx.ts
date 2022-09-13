import { ExportSchedule } from "../services/programming"

Run()

async function Run() {
    console.log('Run Pretalx exporter..')

    await ExportSchedule()
}