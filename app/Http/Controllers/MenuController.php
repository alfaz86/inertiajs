<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Get all of data menus
     * 
     * @return response
     */
    public function menus(Request $request)
    {
        $menus = Menu::orderby('id', 'desc');

        if ($request->q) {
            $menus = $menus->where("name", "like", "%$request->q%")
                ->orwhere('type', $request->q);
        }

        $menus = $menus->get();

        return response()->json([
            'menus' => $menus
        ], 200);
    }
}
