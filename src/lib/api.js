import { supabase } from '../config/supabase.js';

export const api = {
  employees: {
    async getAll() {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
    async create(name, email = null) {
      const { data, error } = await supabase
        .from('employees')
        .insert([{ name, email }])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async update(id, updates) {
      const { data, error } = await supabase
        .from('employees')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async delete(id) {
      const { error } = await supabase
        .from('employees')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
    }
  },

  workcenters: {
    async getAll() {
      const { data, error } = await supabase
        .from('workcenters')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
    async create(name, code) {
      const { data, error } = await supabase
        .from('workcenters')
        .insert([{ name, code }])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  partNumbers: {
    async getAll() {
      const { data, error } = await supabase
        .from('part_numbers')
        .select('*')
        .eq('is_active', true)
        .order('part_number');
      if (error) throw error;
      return data;
    },
    async create(partNumber, description = '') {
      const { data, error } = await supabase
        .from('part_numbers')
        .insert([{ part_number: partNumber, description }])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  customers: {
    async getAll() {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
    async create(name, code) {
      const { data, error } = await supabase
        .from('customers')
        .insert([{ name, code }])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  inspectionItems: {
    async getAll() {
      const { data, error } = await supabase
        .from('inspection_items')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
    async create(name, description = '') {
      const { data, error } = await supabase
        .from('inspection_items')
        .insert([{ name, description }])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  dmtRecords: {
    async getAll() {
      const { data, error } = await supabase
        .from('dmt_records')
        .select(`
          *,
          workcenter:workcenters(name),
          part_number:part_numbers(part_number),
          employee:employees!dmt_records_employee_id_fkey(name),
          customer:customers(name),
          inspection_item:inspection_items(name),
          prepared_by:employees!dmt_records_prepared_by_id_fkey(name),
          disposition_approved_by:employees!dmt_records_disposition_approved_by_id_fkey(name)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    async getById(id) {
      const { data, error } = await supabase
        .from('dmt_records')
        .select(`
          *,
          workcenter:workcenters(name),
          part_number:part_numbers(part_number),
          employee:employees!dmt_records_employee_id_fkey(name),
          customer:customers(name),
          inspection_item:inspection_items(name),
          prepared_by:employees!dmt_records_prepared_by_id_fkey(name),
          disposition_approved_by:employees!dmt_records_disposition_approved_by_id_fkey(name)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    async create(record) {
      const { data, error } = await supabase
        .from('dmt_records')
        .insert([record])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async update(id, updates) {
      const { data, error } = await supabase
        .from('dmt_records')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async delete(id) {
      const { error } = await supabase
        .from('dmt_records')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
    }
  }
};
