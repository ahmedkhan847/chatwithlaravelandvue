<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
//use Spatie\Permission\Traits\HasPermissions;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }

    /**
    * Assign role to the user
    * @param \App\Role $role
    * @return Role response
    */
    public function assign(Role $role){
        return $this->roles()->save($role);
    }

    /**
     * Assign the given role to the user.
     *
     * @param array|string|\Spatie\Permission\Models\Permission ...$permission
     *
     * @return \Spatie\Permission\Contracts\Role
     */
    public function assignPermission(...$permissions)
    {
        $permissions = collect($permissions)
            ->flatten()
            ->map(function ($permission) {
                return $this->getStoredPermission($permission);
            })
            ->all();    
        $this->permissions()->saveMany($permissions);

        $this->forgetCachedPermissions();

        return $this;
    }

}
