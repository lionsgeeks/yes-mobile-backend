<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('reporter/index', [
            'reports' => Report::with('participant')->latest()->get(),
        ]);
    }
    public function destroy($report)
    {
        $report = Report::find($report);
        if (!$report) {
            return redirect()->back()->with('error', 'Report not found');
        }
        $report->delete();
        return redirect()->back()->with('message', 'Report deleted successfully');
    }

    public function destroyAll()
    {
        Report::truncate();
        return redirect()->back()->with('message', 'All reports deleted successfully');
    }
}
