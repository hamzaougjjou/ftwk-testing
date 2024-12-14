<?php

namespace App\Traits;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Support\Facades\URL;

trait FileTrait
{

    public function getFilePath($id)
    {
        if ($id == null) {
            return null;
        }

        $path = "";
        $file = File::find($id);
        $folder_name = "";

        if ($file->folder_id) {
            $folder = Folder::find($file->folder_id);
            $folder_name = "/";
        }
        $path = $folder_name . $file->path;
        return URL::to('/'). "/storage/" . $path;
    }
}
